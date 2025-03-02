import { Image } from 'react-bootstrap';
import { Rnd } from 'react-rnd';
import { useState } from 'react';

interface DraggableImageProps {
  src: string;
  alt?: string;
  caption?: string;
  defaultSize?: { width: number; height: number };
  defaultPosition?: { x: number; y: number };
}

function DraggableImage({ 
  src, 
  alt = "صورة", 
  caption,
  defaultSize = { width: 200, height: 200 },
  defaultPosition = { x: 0, y: 0 }
}: DraggableImageProps) {
  const [rotation, setRotation] = useState(0);

  return (
    <Rnd
      default={{
        ...defaultPosition,
        ...defaultSize
      }}
      className="image-container"
      minWidth={100}
      minHeight={100}
      dragHandleClassName="drag-handle"
      bounds="parent"
    >
      <div 
        className="rotatable-container"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        <div className="drag-handle">
          <Image
            src={src}
            alt={alt}
            fluid
            className="custom-image"
          />
          {caption && <p className="text-dark m-0">{caption}</p>}
        </div>
        <div className="controls">
          <button 
            className="rotation-handle"
            onClick={() => setRotation(prev => (prev - 15) % 360)}
          >
            ⟲
          </button>
          <button 
            className="rotation-handle right"
            onClick={() => setRotation(prev => (prev + 15) % 360)}
          >
            ⟳
          </button>
        </div>
      </div>
    </Rnd>
  );
}

export default DraggableImage;
