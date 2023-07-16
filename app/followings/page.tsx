import EmptyState from "../components/EmptyState";

const Users = () => {
  return (
    <div className="hidden h-full lg:block lg:pl-80">
      <EmptyState title="Following을 한 센터를 선택하여 대화할 수 있어요" />
    </div>
  );
};

export default Users;
