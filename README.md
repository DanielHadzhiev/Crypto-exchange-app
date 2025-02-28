# Crypto Exchange App

## Goal

The Crypto Exchange App is a web application that simulates a cryptocurrency trading platform, allowing users to:

- View real-time prices of the top 20 cryptocurrencies using the Kraken API.
- Maintain a virtual account balance for buying and selling crypto with a history of all transactions made (without actually buying or selling at the exchange).
- Reset their account balance to a starting value.

## Technical Requirements

- **Frontend:** HTML, CSS, JavaScript (consider using a framework like React or Vue.js for better organization and maintainability).
- **Backend:** Java with Spring Boot.
- **API Integration:** Utilize the Kraken WebSocket API ([Kraken WebSocket API](https://docs.kraken.com/api/docs/websocket-v2/ticker)) to fetch real-time cryptocurrency prices.
- **Data Storage:** In-memory storage is sufficient for this simulation. Persistent storage for bonus points.

## Functionality

### 1. Display Top 20 Crypto Prices
- Dynamically update the displayed prices in real-time as they change on the exchange.
- Clearly present the cryptocurrency name, symbol, and current price in a user-friendly table or list format.

### 2. Account Balance and Transactions
- Initialize a virtual account balance with a starting value (e.g., $10,000).
- Implement a mechanism for users to buy and sell cryptocurrencies:
  - **Buying:**
    - Allow users to specify the amount of a cryptocurrency they want to purchase.
    - Deduct the purchase cost (quantity * price) from the account balance.
    - Display a confirmation message or update the UI to reflect the updated balance and holdings.
  - **Selling:**
    - Allow users to specify the amount of a cryptocurrency they want to sell.
    - Increase the account balance by the selling amount (quantity * price).
    - Update the UI to reflect the updated balance and holdings.
- Ensure that transactions respect account balance limitations (users cannot buy more crypto than their current balance allows).
- Provide clear error messages if invalid input is entered (e.g., negative purchase quantity).

### 3. Transactions History
- Users should be able to see a history log of all their transactions (including whether they made a profit or loss).

### 4. Reset Button
- Include a button or link that resets the account balance to the initial value.
- Upon clicking the reset button, update the UI to show the original balance and clear any cryptocurrency holdings.

## Evaluation Criteria

- **Functionality:** Successful implementation of all required features (price display, buying/selling, reset).
- **Code Quality:** Well-structured, readable, and maintainable code following best practices.
- **Error Handling:** Robust error handling to gracefully handle invalid user input, API errors, or unexpected situations.
- **Testing (bonus objective):** Unit tests to ensure the correctness of individual components and integration tests to verify overall application functionality.

## Additional Considerations

- **Performance:** For real-time updates, consider techniques like efficient data structures and caching to optimize performance.
- **Security:** Since this is a simulated application, security is not a major concern.
- **Scalability (bonus objective):** An explanation of how you would scale your application to multiple instances will get you bonus points.
- **Documentation (bonus objective):** Include clear documentation alongside the codebase to explain the purpose of different APIs and design decisions.

## Project Structure

