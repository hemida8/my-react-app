import { useState } from "react";
import DraggableImage from "./components/DraggableImage";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

function App() {
  const [images, setImages] = useState<{ src: string; id: number }[]>([]);
  const [idCounter, setIdCounter] = useState(1); // لتوليد معرف فريد لكل صورة

  // تحميل الصور من الجهاز
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && e.target.result) {
          setImages((prevImages) => [
            ...prevImages,
            { src: e.target.result as string, id: idCounter },
          ]);
          setIdCounter(idCounter + 1);
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
      {/* أزرار التحكم */}
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

      {/* عرض الصور */}
      {images.map((image) => (
        <DraggableImage key={image.id} src={image.src} caption="صورة مرفوعة" />
      ))}
    </div>
  );
}

export default App;
