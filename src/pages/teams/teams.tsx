import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { PlusCircle, RotateCw } from "lucide-react";
import { GET_TEAM_MEMBER } from "@/api/teams/team-mamber";
import type { AppDispatch } from "@/store/store";
import { Button } from "@/components/ui/button";

const TeamCard = ({ member }: { member: any }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [flipped, setFlipped] = useState(false);

  useGSAP(() => {
    gsap.set(cardRef.current, {
      transformStyle: "preserve-3d",
      transformPerspective: 1000,
    });
  }, []);

  const handleFlip = () => {
    gsap.to(cardRef.current, {
      rotateY: flipped ? 0 : 180,
      duration: 0.9,
      ease: "power3.inOut",
    });
    setFlipped(!flipped);
  };

  return (
    <div className="relative w-[80%] h-96 cursor-pointer group perspective" onClick={handleFlip}>
      <div
        ref={cardRef}
        className="relative w-full h-full transition-transform duration-700 transform-style-preserve-3d"
      >
        {/* Front */}
        <div className="absolute w-full h-full backface-hidden rounded-xl overflow-hidden shadow-xl border border-border">
          <img
            src={member.imgUrl}
            alt={member.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 flex justify-between items-end">
            <div>
              <h3 className="text-white text-xl font-bold">{member.name}</h3>
              <p className="text-white text-sm">{member.designation}</p>
            </div>
            <RotateCw className="text-white/80 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>

        {/* Back */}
        <div className="absolute w-full h-full rotate-y-180 backface-hidden rounded-xl shadow-xl border border-border bg-card flex flex-col justify-between p-4 overflow-hidden">
          <div className="space-y-1 overflow-y-auto pr-1">
            <h3 className="text-foreground text-lg font-bold">{member.name}</h3>
            <p className="text-sm text-muted-foreground">
              {member.designation} • {member.location || "India"}
            </p>
            <p className="text-xs text-muted-foreground break-all">{member.email}</p>
            {member.description && (
              <p className="text-xs text-muted-foreground break-words mt-2">
                {member.description}
              </p>
            )}
          </div>
          <div className="pt-2 text-xs text-muted-foreground">{member.mobile}</div>
        </div>
      </div>
    </div>
  );
};

const Teams = () => {
  const dispatch = useDispatch<AppDispatch>();
  const teamData = useSelector((state: any) => state.teams.data ?? []);

  useEffect(() => {
    dispatch(GET_TEAM_MEMBER());
  }, [dispatch]);

  return (
    <div className="px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-foreground">Our Team</h1>
        <Link to="/admin/teams/add-member">
          <Button variant="outline" className="gap-2 border-dashed cursor-pointer">
            <PlusCircle className="w-4 h-4" />
            Add Member
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {teamData.length > 0 ? (
          teamData.map((member: any) => (
            <TeamCard key={member._id} member={member} />
          ))
        ) : (
          <p className="col-span-full text-center text-muted-foreground">
            No team members found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Teams;
