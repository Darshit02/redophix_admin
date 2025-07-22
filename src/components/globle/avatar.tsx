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
    return words.length >= 2
      ? words[0][0] + words[1][0]
      : name.slice(0, 2);
  };

  return (
    <div className="flex items-center gap-4">
      <Avatar className="h-10 w-10">
        <AvatarImage src={imageUrl} alt={name} />
        <AvatarFallback className="bg-muted text-muted-foreground">
          {getInitials(name).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="space-y-0.5 leading-tight">
        <p className="text-sm font-medium text-gray-900 dark:text-white">{name}</p>
        <p className="text-xs text-muted-foreground">{email}</p>
      </div>
    </div>
  );
}
