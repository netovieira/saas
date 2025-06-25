'use client'; // Agora é um Client Component

import Button from '@mui/material/Button';

import { setName } from '@features/authentication/use_cases/setName'

export default function Page() {

  const handleUpdateName = async () => {
    await setName('teste vieira');
  };

  return (
    <>
      <h1>Olá!</h1>
      <p>
        <Button onClick={handleUpdateName}>
          setName
        </Button>
      </p>
    </>
  );
}
