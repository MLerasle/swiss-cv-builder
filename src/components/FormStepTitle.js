export default function FormStepTitle({ id, title }) {
  return (
    <h2 className="text-xl font-semibold leading-7 text-gray-900 mt-8">
      {id}. {title}
    </h2>
  );
}
