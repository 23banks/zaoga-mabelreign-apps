'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { Users } from 'lucide-react';
import Button from '@/components/common/Button';
import { eventAPI } from '@/lib/api';
import { useAuthContext } from '@/hooks/AuthContext';

export default function EventRegisterButton({ eventId, eventTitle, initialAttendeeCount = 0 }) {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuthContext();
  const [isRegistered, setIsRegistered] = useState(false);
  const [attendeeCount, setAttendeeCount] = useState(initialAttendeeCount);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) return;
    eventAPI
      .getById(eventId)
      .then((res) => {
        setIsRegistered(res.data.isRegistered);
        setAttendeeCount(res.data.attendeeCount);
      })
      .catch(() => {});
  }, [eventId, isAuthenticated]);

  const handleClick = async () => {
    if (!isAuthenticated) {
      toast.info('Please log in to register for this event');
      router.push('/login');
      return;
    }

    setIsLoading(true);
    try {
      const action = isRegistered ? eventAPI.unregister : eventAPI.register;
      const res = await action(eventId);
      setIsRegistered(res.data.isRegistered);
      setAttendeeCount(res.data.attendeeCount);
      toast.success(
        res.data.isRegistered ? `You're registered for "${eventTitle}"!` : 'Registration cancelled'
      );
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <Button
        variant={isRegistered ? 'secondary' : 'primary'}
        isLoading={isLoading || authLoading}
        onClick={handleClick}
      >
        {isRegistered ? 'Cancel Registration' : 'Register for This Event'}
      </Button>
      <span className="flex items-center gap-1 text-sm text-gray-500">
        <Users size={16} /> {attendeeCount} registered
      </span>
    </div>
  );
}
