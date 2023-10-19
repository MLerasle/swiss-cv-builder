export default function FormStepTitle({ id, title }) {
  return (
    <>
      {id === 1 && (
        <>
          <p className="text-gray-800 mt-8">Bienvenue 👋</p>
          <h1 className="text-3xl font-bold leading-8 text-gray-950 mt-2">
            Commencez à rédiger votre nouveau CV
          </h1>
        </>
      )}
      <h2 className="text-xl font-semibold leading-7 text-gray-900 mt-8">
        {id}. {title}
      </h2>
    </>
  );
}
