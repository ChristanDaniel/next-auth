import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import { FormEvent, useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles/Home.module.css'

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn } = useContext(AuthContext)

  async function handleSumit(event: FormEvent) {
    event.preventDefault();

    const data = {
      email,
      password
    }

    await signIn(data);
  }

  return (
    <form onSubmit={handleSumit} className={styles.container}>
      <input type="email" value={email} onChange={event => setEmail(event.target.value)} />
      <input type="password" value={password} onChange={event => setPassword(event.target.value)} />

      <button type="submit">Entrar</button>
    </form>
  )
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = parseCookies(ctx);

  if (cookies['nextauth.token']) {
    return {
      redirect: {
        destination:'/dashboard',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}