interface Props {
  label: string;
  count: number;
}

const Statistics = ({ label, count }: Props) => {
  return (
    <div className="text-center">
      <h1>{count}</h1>
      <p>{label}</p>
    </div>
  );
};

export default Statistics;
