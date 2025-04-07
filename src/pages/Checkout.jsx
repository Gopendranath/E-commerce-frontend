import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Optional: for redirection
import { clearCart } from '../redux/slices/cartSlice'; // Adjust path as needed
import { toast } from 'react-hot-toast';

function CheckoutPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Optional
  const [cartItems, setcartItems] = React.useState([]);

  // Fetch cart items
  useEffect(
    () => {
      const items = localStorage.getItem('cart');
      if (items) {
        setcartItems(JSON.parse(items));
      }
    },
    []
  )

  // State for form inputs
  const [shippingInfo, setShippingInfo] = React.useState({
    fullName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States', // Default or fetch options
    phone: '',
  });

  // State for billing
  const [billingSameAsShipping, setBillingSameAsShipping] = React.useState(true);
  const [billingInfo, setBillingInfo] = React.useState({ ...shippingInfo }); // Initialize same as shipping

  const [paymentMethod, setPaymentMethod] = React.useState('creditCard'); // 'creditCard', 'paypal', etc.
  const [cardInfo, setCardInfo] = React.useState({
    cardNumber: '',
    expiryDate: '', // MM/YY
    cvv: ''
  });

  // State for order processing
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [error, setError] = React.useState(null);

  // --- Input Handlers ---
  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
    // If billing is same as shipping, update billing too
    if (billingSameAsShipping) {
      setBillingInfo(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    setBillingInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    // Basic formatting/validation could go here (e.g., limit length)
    setCardInfo(prev => ({ ...prev, [name]: value }));
  }

  // --- Checkbox Handler ---
  const handleBillingCheckbox = (e) => {
    setBillingSameAsShipping(e.target.checked);
    if (e.target.checked) {
      setBillingInfo({ ...shippingInfo }); // Copy shipping to billing
    } else {
      // Optionally clear billing or leave as is
      setBillingInfo({ fullName: '', address1: '', address2: '', city: '', state: '', zip: '', country: 'United States', phone: '' });
    }
  };

  // --- Calculations ---
  const subtotal = React.useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cartItems]);

  const shippingCost = subtotal > 50 || subtotal === 0 ? 0 : 5.99;
  const taxRate = 0.08; // 8% example tax rate
  const taxes = subtotal * taxRate;
  const total = subtotal + shippingCost + taxes;

  // --- Submit Handler ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsProcessing(true);

    console.log("Submitting Order:", {
      shippingInfo,
      billingInfo: billingSameAsShipping ? 'Same as Shipping' : billingInfo,
      paymentMethod,
      cartItems,
      totals: { subtotal, shippingCost, taxes, total },
    });

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay

      console.log("Order Placed Successfully!");
      dispatch(clearCart());
      navigate('/order-confirmation', { state: { orderId: 'SIMULATED_12345' } });
      toast.success("Order Placed Successfully!");

    } catch (apiError) {
      console.error("Order placement failed:", apiError);
      setError("Failed to place order. Please try again."); // Display user-friendly error
    } finally {
      setIsProcessing(false);
    }
  };

  // --- Render ---
  if (cartItems.length === 0 && !isProcessing) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-6">You need items in your cart to check out.</p>
        <button onClick={() => navigate('/')} className="inline-block bg-purple-600 text-white font-medium py-2 px-6 rounded-md hover:bg-purple-700 transition duration-200">
          Continue Shopping
        </button>
      </div>
    );
  }


  return (
    <div className="container mx-auto px-4 py-8 lg:py-12">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">Checkout</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2 space-y-8">

            {/* --- Shipping Address --- */}
            <section>
              <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-800">Shipping Address</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Input fields - Example: Full Name */}
                <div className="sm:col-span-2">
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input type="text" id="fullName" name="fullName" value={shippingInfo.fullName} onChange={handleShippingChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                <div>
                  <label htmlFor="address1" className="block text-sm font-medium text-gray-700 mb-1">Address Line 1</label>
                  <input type="text" id="address1" name="address1" value={shippingInfo.address1} onChange={handleShippingChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                <div>
                  <label htmlFor="address2" className="block text-sm font-medium text-gray-700 mb-1">Address Line 2 <span className="text-xs text-gray-500">(Optional)</span></label>
                  <input type="text" id="address2" name="address2" value={shippingInfo.address2} onChange={handleShippingChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input type="text" id="city" name="city" value={shippingInfo.city} onChange={handleShippingChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State / Province</label>
                  <input type="text" id="state" name="state" value={shippingInfo.state} onChange={handleShippingChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                <div>
                  <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">ZIP / Postal Code</label>
                  <input type="text" id="zip" name="zip" value={shippingInfo.zip} onChange={handleShippingChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                  {/* Consider using a <select> for country */}
                  <input type="text" id="country" name="country" value={shippingInfo.country} onChange={handleShippingChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number <span className="text-xs text-gray-500">(For delivery updates)</span></label>
                  <input type="tel" id="phone" name="phone" value={shippingInfo.phone} onChange={handleShippingChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                {/* Add other shipping fields similarly */}
              </div>
            </section>

            {/* --- Billing Address --- */}
            <section>
              <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-800">Billing Address</h2>
              <div className="mb-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={billingSameAsShipping}
                    onChange={handleBillingCheckbox}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <span className="text-sm text-gray-700">Same as shipping address</span>
                </label>
              </div>

              {!billingSameAsShipping && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Duplicate shipping fields structure here, but use handleBillingChange */}
                  <div className="sm:col-span-2">
                    <label htmlFor="billingFullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input type="text" id="billingFullName" name="fullName" value={billingInfo.fullName} onChange={handleBillingChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                  </div>
                  {/* ... other billing fields ... */}
                  <div>
                    <label htmlFor="billingAddress1" className="block text-sm font-medium text-gray-700 mb-1">Address Line 1</label>
                    <input type="text" id="billingAddress1" name="address1" value={billingInfo.address1} onChange={handleBillingChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                  </div>
                  <div>
                    <label htmlFor="billingCity" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input type="text" id="billingCity" name="city" value={billingInfo.city} onChange={handleBillingChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                  </div>
                  {/* ... etc ... */}
                </div>
              )}
            </section>

            {/* --- Payment Method --- */}
            <section>
              <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-800">Payment Method</h2>
              <div className="space-y-4">
                {/* Radio buttons for payment options */}
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  <div onClick={() => setPaymentMethod('creditCard')} className="cursor-pointer border-gray-500 rounded-md p-4 flex items-center space-x-3 has-[:checked]:bg-indigo-50 has-[:checked]:border-indigo-300">
                    <input type="radio" id="creditCard" name="paymentMethod" value="creditCard" checked={paymentMethod === 'creditCard'} onChange={(e) => setPaymentMethod(e.target.value)} className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500" />
                    <label htmlFor="creditCard" className="text-sm font-medium text-gray-700">Credit Card</label>
                  </div>
                  {/* Placeholder for other methods */}
                  <div onClick={() => setPaymentMethod('paypal')} className="cursor-pointer border-gray-500 rounded-md p-4 flex items-center space-x-3 has-[:checked]:bg-indigo-50 has-[:checked]:border-indigo-300">
                    <input type="radio" id="paypal" name="paymentMethod" value="paypal" checked={paymentMethod === 'paypal'} onChange={(e) => setPaymentMethod(e.target.value)} className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500" />
                    <label htmlFor="paypal" className="text-sm font-medium text-gray-700">PayPal</label>
                  </div>
                </div>

                {/* Credit Card Fields (conditional) */}
                {paymentMethod === 'creditCard' && (
                  <div className="border border-gray-200 rounded-md p-4 mt-4 space-y-4 bg-gray-50">
                    <p className="text-xs text-red-600 font-semibold">Note: For demonstration only. Do not enter real card details. Use a secure payment provider in production.</p>
                    <div>
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                      <input type="text" id="cardNumber" name="cardNumber" value={cardInfo.cardNumber} onChange={handleCardChange} placeholder="xxxx xxxx xxxx xxxx" required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                        <input type="text" id="expiryDate" name="expiryDate" value={cardInfo.expiryDate} onChange={handleCardChange} placeholder="MM/YY" required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                      </div>
                      <div>
                        <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                        <input type="text" id="cvv" name="cvv" value={cardInfo.cvv} onChange={handleCardChange} placeholder="123" required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Add content for other payment methods if needed */}
                {paymentMethod === 'paypal' && (
                  <div className="border border-gray-200 rounded-md p-4 mt-4 bg-gray-50">
                    <p className="text-sm text-gray-600">You will be redirected to PayPal to complete your payment securely.</p>
                    {/* In reality, clicking "Place Order" might trigger PayPal SDK */}
                  </div>
                )}
              </div>
            </section>

          </div> {/* End Left Column (Forms) */}

          {/* Column 3: Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200 sticky top-6"> {/* Sticky summary */}
              <h2 className="text-xl font-semibold mb-6 border-b pb-3 text-gray-800">Order Summary</h2>

              {/* Cart Items */}
              <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between items-start text-sm">
                    <div className="flex-1 mr-2">
                      <p className="font-medium text-gray-700 truncate">{item.title}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-gray-800 font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-2 border-t pt-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium text-gray-800">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping:</span>
                  <span className="font-medium text-gray-800">${shippingCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Taxes ({(taxRate * 100).toFixed(0)}%):</span>
                  <span className="font-medium text-gray-800">${taxes.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold border-t pt-3 mt-3 text-gray-900">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <p className="mt-4 text-sm text-red-600 bg-red-100 p-3 rounded-md">{error}</p>
              )}

              {/* Place Order Button */}
              <button
                type="submit"
                disabled={isProcessing || cartItems.length === 0}
                className="cursor-pointer mt-6 w-full bg-purple-600 text-white py-3 px-4 rounded-md shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out font-semibold text-lg"
              >
                {isProcessing ? (
                  <div className="flex justify-center items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </div>
                ) : (
                  `Place Order ($${total.toFixed(2)})`
                )}
              </button>

            </div>
          </div> {/* End Right Column (Summary) */}

        </div> {/* End Grid */}
      </form>
    </div>
  );
}

export default CheckoutPage;