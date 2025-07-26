import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

interface UserAvatarProps {
  name: string;
  email: string;
  imageUrl?: string;
}

export default function UserAvatar({ name, email, imageUrl }: UserAvatarProps) {
  const getInitials = (name: string) => {
    const words = name.trim().split(" ");
    if (words.length >= 2) return words[0][0] + words[1][0];
    if (words.length === 1) return words[0].slice(0, 2);
    return "NA";
  };

  return (
    <div className="flex items-center gap-3">
      <Avatar className="h-10 w-10">
        <AvatarImage src={imageUrl} alt={name} />
        <AvatarFallback className="bg-muted text-muted-foreground text-sm font-medium">
          {getInitials(name).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="leading-tight space-y-0.5">
        <p className="text-sm font-medium text-foreground">{name}</p>
        <p className="text-xs text-muted-foreground">{email}</p>
      </div>
    </div>
  );
}
