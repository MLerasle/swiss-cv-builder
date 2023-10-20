import { Card, CardBody } from "@nextui-org/react";
import { LightBulbIcon, XMarkIcon } from "@heroicons/react/24/solid";

export default function HelpCard({ content, onClose }) {
  return (
    <Card className="fixed bottom-6 right-6 bg-gray-800 text-gray-50 z-50 max-w-xl">
      <CardBody className="grid grid-cols-12">
        <div className="col-span-1">
          <LightBulbIcon
            className="w-5 h-5 text-yellow-300"
            aria-hidden="true"
          />
        </div>
        <div className="col-span-10">
          <ul className="space-y-6">
            {content.map((section) => (
              <li key={section.title}>
                <b>{section.title}</b> - {section.desc}
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-1">
          <XMarkIcon
            className="w-5 h-5 cursor-pointer"
            aria-hidden="true"
            onClick={onClose}
          />
        </div>
      </CardBody>
    </Card>
  );
}
