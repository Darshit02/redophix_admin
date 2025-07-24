import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CirclePlus } from "lucide-react";

import { GET_TEAM_MEMBER } from "@/api/teams/team-mamber";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { AppDispatch } from "@/store/store";

const Teams = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const teamData = useSelector((state: any) => state.teams.data ?? []);

  console.log(teamData)
  const fetchTeamMambers = () => {
    const payload: any = {};
    dispatch(GET_TEAM_MEMBER(payload));
  };

  useEffect(() => {
    fetchTeamMambers();
  }, []);

  const handleAddMemberClick = () => {
    navigate("/admin/teams/add-mamber");
  };

  console.log("fetch team Data", teamData);

  return (
    <div className="flex flex-col h-full px-4 py-6 md:px-6">
      <div className="flex justify-between items-center">
        <p className="text-sm md:text-base text-gray-800 dark:text-gray-200 mb-3">
          Our Team
        </p>
        <Button
          onClick={handleAddMemberClick}
          className={cn(
            "group relative overflow-hidden rounded-lg px-5 py-3 text-white bg-amber-600",
            "hover:bg-amber-700 transition-all duration-300 ease-in-out",
            "shadow-md hover:shadow-xl active:scale-95 cursor-pointer"
          )}
        >
          <span
            className={cn(
              "absolute inset-0 bg-amber-500 opacity-0 group-hover:opacity-10 transition duration-300",
              "pointer-events-none"
            )}
          />
          <CirclePlus className="mr-2 transition-transform duration-300 group-hover:rotate-90" />
          <span className="font-semibold tracking-wide">Add Member</span>
        </Button>
      </div>

      {/* Team Member Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {teamData.length > 0 ? (
          teamData.map((member: any) => (
            <div
              key={member._id}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md"
            >
              <img
                src={member.imgUrl}
                alt={member.name}
                className="w-full h-48 object-cover rounded-md mb-2"
              />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {member.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {member.designation}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {member.email}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 dark:text-gray-400 col-span-full text-center">
            No team members found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Teams;
