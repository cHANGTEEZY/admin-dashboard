import { useGetPropertiesQuery } from '../state/api';
import image1 from '../assets/Properties/image1.jpg';
import image2 from '../assets/Properties/image2.jpg';
import image3 from '../assets/Properties/image3.jpg';
import image4 from '../assets/Properties/image4.jpg';
import image5 from '../assets/Properties/image5.jpg';
import image6 from '../assets/Properties/image6.jpg';
import { useState } from 'react';

const imageMap = {
  'image1.jpg': image1,
  'image2.jpg': image2,
  'image3.jpg': image3,
  'image4.jpg': image4,
  'image5.jpg': image5,
  'image6.jpg': image6,
};

const PendingProperties = () => {
  const { data, isLoading } = useGetPropertiesQuery();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [declineReason, setDeclineReason] = useState('');

  const handleOpenModal = (property) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProperty(null);
    setDeclineReason('');
  };

  const handleDeclineSubmit = () => {
    console.log('Declined property:', selectedProperty);
    console.log('Reason:', declineReason);
    handleCloseModal();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="px-4 py-10">
      <div className="grid grid-cols-2 gap-6">
        {data.map((property) => (
          <div key={property.property_id} className="card flex items-start bg-white rounded-lg p-4 space-x-4 max-w-lg">
            <div className="w-[200px] h-[200px]">
              <img 
                className="object-cover h-full w-full rounded-lg" 
                src={property.image_urls && property.image_urls.length > 0 
                  ? imageMap[property.image_urls[0]]
                  : image1}
                alt={property.title}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = image1;
                }}
              />
            </div>

            <div className="flex-1 bg-white">
              <h2 className="text-lg font-semibold bg-white">{property.title}</h2>
              <p className="text-sm text-gray-600 bg-white">{property.property_type} located at a beautiful destination.</p>
              <p className="text-sm mt-3 text-primary bg-white">Hosted By: {property.hosted_by}</p>

              <div className="mt-3">
                <p className="text-lg font-bold bg-white">NRP {property.price}/night</p>
              </div>

              <div className="mt-2 flex gap-2 bg-white">
                <button className="bg-green-500 text-white py-1 px-4 rounded-lg hover:bg-green-600">
                  Accept
                </button>
                <button
                  className="bg-red-500 text-white py-1 px-4 rounded-lg hover:bg-red-600"
                  onClick={() => handleOpenModal(property)}
                >
                  Decline
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold bg-white">Decline Property</h2>
            <p className="text-sm text-gray-600 mt-2 bg-white">Why are you declining this property?</p>
            <textarea
              className="w-full mt-3 border border-gray-300 rounded-lg p-2"
              rows="4"
              placeholder="Enter your reason..."
              value={declineReason}
              onChange={(e) => setDeclineReason(e.target.value)}
            />
            <div className="mt-4 flex justify-end gap-2 bg-white">
              <button
                className="bg-gray-300 text-gray-800 py-1 px-4 rounded-lg hover:bg-gray-400"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white py-1 px-4 rounded-lg hover:bg-red-600"
                onClick={handleDeclineSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingProperties;
