import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {};

const BackButton: React.FC<Props> = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        navigate(-1); // Navigate back on "Escape"
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigate]);

  return (
    <Button
      variant="outline"
      className="rounded-none flex justify-center items-center"
      onClick={() => navigate(-1)}
    >
      <ChevronLeft />
      Back
    </Button>
  );
};

export default BackButton;