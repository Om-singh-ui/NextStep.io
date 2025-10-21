import { NextResponse } from 'next/server';

// Simple in-memory cache
let cache = {
  data: null,
  timestamp: 0,
};

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const owner = searchParams.get('owner');
  const repo = searchParams.get('repo');

  if (!owner || !repo) {
    return NextResponse.json(
      { error: 'Missing owner or repo parameters' },
      { status: 400 }
    );
  }

  try {
    const cacheKey = `${owner}/${repo}`;
    const now = Date.now();
    const cacheTTL = 300000; // 5 minutes

    // Check cache first
    if (cache.data && cache.key === cacheKey && (now - cache.timestamp) < cacheTTL) {
      console.log('Returning cached GitHub data');
      return NextResponse.json({
        ...cache.data,
        cached: true
      });
    }

    const headers = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'NextStep-io-App'
    };

    // Add authentication if available
    if (process.env.GITHUB_TOKEN) {
      headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    console.log('Fetching from GitHub API...');
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers,
      next: { revalidate: 300 } // 5 minutes
    });

    if (!response.ok) {
      // Handle rate limiting
      if (response.status === 403) {
        const rateLimitRemaining = response.headers.get('x-ratelimit-remaining');
        console.warn(`GitHub API rate limit: ${rateLimitRemaining} requests remaining`);
        
        // Return cached data if available
        if (cache.data && cache.key === cacheKey) {
          return NextResponse.json({
            ...cache.data,
            cached: true,
            error: 'Rate limit exceeded - using cached data'
          });
        }
        
        return NextResponse.json(
          { error: 'GitHub API rate limit exceeded' },
          { status: 429 }
        );
      }

      const errorText = await response.text();
      throw new Error(`GitHub API returned ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    
    const result = {
      stars: data.stargazers_count,
      lastUpdated: new Date().toISOString(),
      owner,
      repo
    };

    // Update cache
    cache = {
      data: result,
      timestamp: now,
      key: cacheKey
    };

    console.log('GitHub API success:', result.stars, 'stars');
    return NextResponse.json(result);

  } catch (error) {
    console.error('GitHub API route error:', error);
    
    // Return cached data if available
    const cacheKey = `${owner}/${repo}`;
    if (cache.data && cache.key === cacheKey) {
      return NextResponse.json({
        ...cache.data,
        cached: true,
        error: error.message
      });
    }
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch GitHub stars',
        details: error.message
      },
      { status: 500 }
    );
  }
}