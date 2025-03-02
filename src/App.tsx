import { useState } from "react";
import DraggableImage from "./components/DraggableImage";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

function App() {
  const [images, setImages] = useState<{ src: string; id: number }[]>([]);
  const [idCounter, setIdCounter] = useState(1);

  // تحميل الصور من الجهاز
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === "string") {
          setImages((prevImages) => [
            ...prevImages,
            { src: result, id: idCounter },
          ]);
          setIdCounter((prevId) => prevId + 1);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // حذف جميع الصور
  const clearImages = () => {
    setImages([]);
  };

  return (
    <div className="app-container">
      <div className="waves"></div>
      <h1 className="transparent-text">🎓 mohammed hemida 🎓</h1>
      <div className="controls">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="btn btn-primary"
        />
        <button onClick={clearImages} className="btn btn-danger">
          🗑️ مسح الكل
        </button>
      </div>

      {images.map((image) => (
        <DraggableImage key={image.id} src={image.src} caption="صورة مرفوعة" />
      ))}
    </div>
  );
}

export default App;
