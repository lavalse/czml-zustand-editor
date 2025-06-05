import { ViewerPanel } from "./components/ViewerPanel";
import { CommandPanel } from "./components/CommandPanel";

function App() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      
      <div style={{ flex: 1 }}>
        <ViewerPanel />
      </div>
      <div style={{ width: "300px", background: "#eee" }}>
        <CommandPanel />
      </div>
    </div>
  );
}

export default App;
