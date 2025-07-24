import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { PlusCircle } from "lucide-react";
import { GET_TEAM_MEMBER } from "@/api/teams/team-mamber";
import type { AppDispatch } from "@/store/store";

const TeamCard = ({ member }: { member: any }) => {
  const cardRef = useRef(null);
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
    <div className="relative w-full h-96 cursor-pointer group" onClick={handleFlip}>
      <div
        ref={cardRef}
        className="relative w-full h-full transition-transform duration-700 transform-style-preserve-3d"
      >
        {/* Front */}
        <div className="absolute w-full h-full backface-hidden rounded-xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-800">
          <img
            src={member.imgUrl}
            alt={member.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <h3 className="text-white text-xl font-bold">{member.name}</h3>
            <p className="text-white text-sm">{member.designation}</p>
          </div>
        </div>

        {/* Back */}
        <div className="absolute w-full h-full rotate-y-180 backface-hidden rounded-xl shadow-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex flex-col justify-between p-4">
          <div>
            <h3 className="text-gray-900 dark:text-white text-xl font-bold mb-1">
              {member.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
              {member.designation} • {member.location || "INDIA"}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 break-all">
              {member.email}
            </p>
             <p className="text-xs text-gray-500 dark:text-gray-400 break-all">
              {member.description}
            </p>
          </div>
          <div className="flex justify-between text-center text-sm font-medium text-gray-700 dark:text-gray-300 mt-4">
             <p className="text-xs text-gray-500 dark:text-gray-400 break-all">
              {member.mobile}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Teams = () => {
   const dispatch = useDispatch<AppDispatch>();
  const teamData = useSelector((state: any) => state.teams.data ?? []);
   const fetchTeamMambers = () => {
    const payload: any = {};
    dispatch(GET_TEAM_MEMBER(payload));
  };

  useEffect(() => {
    fetchTeamMambers();
  }, []);

  return (
    <div className="px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Our Team</h1>
        <Link
          to="/admin/portfolio/add-projects"
          className="inline-flex items-center cursor-pointer"
        >
          <button className="flex items-center gap-2 text-indigo-600 text-sm px-4 py-2 border border-dashed border-indigo-600 rounded-lg transition hover:bg-indigo-50 dark:hover:bg-indigo-950">
            <PlusCircle className="w-4 h-4" /> Add New
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {teamData.length > 0 ? (
          teamData.map((member: any) => (
            <TeamCard key={member._id} member={member} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 dark:text-gray-400">
            No team members found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Teams;
