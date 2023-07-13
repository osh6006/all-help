interface EmptyStateProps {
  title?: string;
}

const EmptyState = ({
  title = "탭을 클릭 후 새로운 대화를 시작해 보세요!",
}: EmptyStateProps) => {
  return (
    <div
      className="
        flex
        h-full
        items-center
        justify-center
        bg-gray-100
        px-4
        py-10
        sm:px-6
        lg:px-8
      "
    >
      <div className="flex flex-col items-center text-center">
        <h3
          className="
          mt-2
          font-mono
          text-2xl
          text-gray-900
        "
        >
          {title}
        </h3>
      </div>
    </div>
  );
};

export default EmptyState;
