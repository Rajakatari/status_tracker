import "./App.css";
import Stepper from "./components/Stepper/index";

const checkoutComponents = [
  {
    id: 1,
    name: "Customer Info",
    Component: () => <div>Provide your cantact details.</div>,
  },
  {
    id: 2,
    name: "Shipping Info",
    Component: () => <div>Provide your Shipping details.</div>,
  },
  {
    id: 3,
    name: "Payment",
    Component: () => <div>Complete payment for your order.</div>,
  },
  {
    id: 4,
    name: "Delivered",
    Component: () => <div>Your order has been delivered.</div>,
  },
];
const App = () => {
  return (
    <div>
      <h1>Check out</h1>
      <Stepper stepsConfig={checkoutComponents} />
    </div>
  );
};

export default App;
