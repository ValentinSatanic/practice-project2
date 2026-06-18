import { useEffect } from "react";

const YandexMap = () => {
  useEffect(() => {
    if (!window.ymaps) return;

    window.ymaps.ready(() => {
      const container = document.getElementById("yandex-map");
      if (container) container.innerHTML = "";

      const map = new window.ymaps.Map("yandex-map", {
        center: [55.713486, 37.631757],
        zoom: 17,
        controls: ["zoomControl"],
      });

      const placemark = new window.ymaps.Placemark(
        [55.713486, 37.631757],
        {
          balloonContent: "IThub college<br/>Dubininskaya Ulitsa, 96",
        },
        {
          preset: "islands#redIcon",
        }
      );

      map.geoObjects.add(placemark);
    });
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "400px" }}>
      
      <div id="yandex-map" style={{ width: "100%", height: "100%" }} />

      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          width: "300px",
          backgroundColor: "white",
          padding: "16px",
          borderRadius: "8px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
          zIndex: 1000,
          fontFamily: "Arial, sans-serif",
        }}
      >
        <h3 style={{ margin: "0 0 4px 0", fontSize: "18px", color: "#000" }}>
          IThub college
        </h3>
        <p style={{ margin: "0 0 8px 0", fontSize: "13px", color: "#666" }}>
          Dubininskaya Ulitsa, 96, Moscow
        </p>
        
        <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
          <span style={{ color: "#000000ff", fontWeight: "bold", marginRight: "4px" }}>4.5</span>
          <span style={{ color: "#e7711b", marginRight: "4px" }}>★★★★★</span>
          <a href="#" style={{ color: "#1a73e8", fontSize: "12px", textDecoration: "none" }}>
            395 reviews
          </a>
        </div>

        <a 
          href="https://yandex.ru/maps/213/moscow/?ll=37.632466%2C55.713305&mode=poi&poi%5Bpoint%5D=37.631670%2C55.713486&poi%5Buri%5D=ymapsbm1%3A%2F%2Forg%3Foid%3D95577712686%26yclid%3D5752923286557163519&z=19.27"
          target="_blank" 
          rel="noreferrer"
          style={{ color: "#1a73e8", fontSize: "12px", textDecoration: "none" }}
        >
          View larger map
        </a>

        <a 
            href="https://yandex.ru/maps/213/moscow/?ll=37.637287%2C55.712280&mode=routes&rtext=~55.713486%2C37.631670&rtt=pd&ruri=~ymapsbm1%3A%2F%2Forg%3Foid%3D95577712686&z=16.57"
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
                position: "absolute", 
                top: "16px", 
                right: "16px", 
                display: "flex", 
                flexDirection: "column", 
                alignItems: "center",
                cursor: "pointer",
                textDecoration: "none"
            }}
        >
            <div style={{ width: "24px", height: "24px", background: "#4285F4", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                 <span style={{color: "white", fontSize: "14px"}}>➤</span>
            </div>
            <span style={{ fontSize: "10px", color: "#4285F4", marginTop: "2px" }}>Directions</span>
        </a>
      </div>
    </div>
  );
};

export default YandexMap;