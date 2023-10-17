import { Card, CardHeader, CardBody } from "@nextui-org/react";
import { LightBulbIcon, XMarkIcon } from "@heroicons/react/24/solid";

export default function HelpCard({ title, content, onClose }) {
  return (
    <Card className="fixed bottom-6 right-6 bg-gray-800 text-gray-50 z-100 max-w-xl">
      <CardHeader className="flex justify-between items-center">
        <div className="flex items-center">
          <LightBulbIcon
            className="w-5 h-5 text-yellow-300"
            aria-hidden="true"
          />
          <h1 className="ml-2 font-semibold text-lg">{title}</h1>
        </div>
        <XMarkIcon
          className="w-6 h-6 cursor-pointer"
          aria-hidden="true"
          onClick={onClose}
        />
      </CardHeader>
      <CardBody>
        <p>{content}</p>
      </CardBody>
    </Card>
  );
}
