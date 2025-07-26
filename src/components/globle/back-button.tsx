import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        navigate(-1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);

  return (
    <Button
      type="button"
      variant="outline"
      title="Go back"
      className="flex items-center gap-2 rounded-md text-muted-foreground hover:text-foreground cursor-pointer"
      onClick={() => navigate(-1)}
    >
      <ChevronLeft className="w-4 h-4" />
      Back
    </Button>
  );
};

export default BackButton;
