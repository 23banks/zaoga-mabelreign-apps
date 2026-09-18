'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import Button from '@/components/common/Button';

export default function EventRegisterButton({ eventTitle }) {
  const [registered, setRegistered] = useState(false);

  const handleClick = () => {
    setRegistered(true);
    toast.success(`You're registered for "${eventTitle}"!`);
  };

  return (
    <Button variant={registered ? 'secondary' : 'primary'} disabled={registered} onClick={handleClick}>
      {registered ? "You're Registered" : 'Register for This Event'}
    </Button>
  );
}
