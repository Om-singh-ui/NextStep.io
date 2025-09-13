import { checkUser } from '@/lib/checkUser';
import HeaderClient from './HeaderClient';

export default async function HeaderServer() {
  const user = await checkUser();
  
  return <HeaderClient user={user} />;
}