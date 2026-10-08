import {useState} from "react";
import UserHeader from "./UserHeader.jsx";
import UsersList from "./UsersList.jsx";
import UserDetail from "./UserDetail.jsx";
import { usersData, userGroupsData } from "../../../data/data.js";

const ALL_GROUPS = Array.from(
  new Map(userGroupsData.groups.map((g) => [g.group.id, g.group])).values()
);

const UsersPanel = () => {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [userGroups, setUserGroups] = useState(userGroupsData.groups);

  const selectedUser = usersData.find((u) => u.id === selectedUserId) ?? null;
  const selectedUserGroups = userGroups.filter(
    (g) => g.user_id === selectedUserId
  );

  const handleAddToGroup = (groupId) => {
    const group = ALL_GROUPS.find((g) => g.id === groupId);
    if (!group || !selectedUser) return;

    const now = new Date().toISOString();
    
    setUserGroups((prev) => [
      ...prev,
      {
        user_id: selectedUser.id,
        group_id: group.id,
        created_at: now,
        updated_at: now,
        group,
      },
    ]);
  };

  const handleRemoveFromGroup = (groupId) => {
    setUserGroups((prev) =>
      prev.filter(
        (g) => !(g.user_id === selectedUserId && g.group_id === groupId)
      )
    );
  };

  if (selectedUser) {
    return (
      <UserDetail
        user={selectedUser}
        userGroups={selectedUserGroups}
        allGroups={ALL_GROUPS}
        onBack={() => setSelectedUserId(null)}
        onAdd={handleAddToGroup}
        onRemove={handleRemoveFromGroup}
      />
    );
  }

  return (
    <div className="space-y-5 sm:space-y-6">
      <UserHeader />
      <UsersList
        users={usersData}
        groups={userGroups}
        onSelect={setSelectedUserId}
      />
    </div>
  );
};
 export default UsersPanel;