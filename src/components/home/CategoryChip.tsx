
const CategoryChip = ({ title }: { title: string }) => {
  return <div className="bg-secondary text-secondary-foreground px-6 py-4 rounded-3xl text-xl font-semibold">
    {title}
  </div>;
};

export default CategoryChip;
