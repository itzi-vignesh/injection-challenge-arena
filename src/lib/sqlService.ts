
// This is a mock service to simulate SQL operations and detect injections
// It doesn't actually run SQL, but simulates how an app would process inputs

// Mock database schema:
// users: id, username, password, email, role
// products: id, name, description, price, category

interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  role: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
}

// Mock database data
const users: User[] = [
  { id: 1, username: 'admin', password: 'admin123', email: 'admin@example.com', role: 'admin' },
  { id: 2, username: 'user1', password: 'password1', email: 'user1@example.com', role: 'user' },
  { id: 3, username: 'user2', password: 'password2', email: 'user2@example.com', role: 'user' },
  { id: 4, username: 'user3', password: 'password3', email: 'user3@example.com', role: 'user' },
  { id: 5, username: 'user4', password: 'password4', email: 'user4@example.com', role: 'user' },
];

const products: Product[] = [
  { id: 1, name: 'Laptop', description: 'High-performance laptop', price: 999.99, category: 'electronics' },
  { id: 2, name: 'Smartphone', description: 'Latest smartphone model', price: 699.99, category: 'electronics' },
  { id: 3, name: 'Headphones', description: 'Noise-cancelling headphones', price: 199.99, category: 'electronics' },
  { id: 4, name: 'Desk', description: 'Modern office desk', price: 249.99, category: 'furniture' },
  { id: 5, name: 'Chair', description: 'Ergonomic office chair', price: 149.99, category: 'furniture' },
];

// Mock vulnerable login function
export const login = (username: string, password: string): User | null => {
  // VULNERABLE: Direct string concatenation without sanitization
  const query = `SELECT * FROM users WHERE username='${username}' AND password='${password}'`;
  
  console.log('Executing query:', query);
  
  // This simulates an SQL injection vulnerability
  if (query.includes("' OR '1'='1") || query.includes("' --") || query.includes("';--")) {
    // SQL injection detected, return all users
    console.log('SQL injection detected!');
    return users[0]; // Return admin user
  }
  
  // Normal login flow
  return users.find(user => user.username === username && user.password === password) || null;
};

// Mock vulnerable product search function
export const searchProducts = (category: string): Product[] => {
  // VULNERABLE: Direct string concatenation without sanitization
  const query = `SELECT * FROM products WHERE category='${category}'`;
  
  console.log('Executing query:', query);
  
  // Check for UNION-based attacks
  if (query.toLowerCase().includes('union select')) {
    console.log('UNION-based SQL injection detected!');
    // In a real system, this might expose sensitive data
    if (query.toLowerCase().includes('from users')) {
      return users.map(user => ({
        id: user.id,
        name: user.username,
        description: user.password, // This would expose passwords in a real scenario
        price: 0,
        category: user.role
      }));
    }
  }
  
  // Normal search
  return products.filter(product => product.category === category);
};

// Mock vulnerable function for blind SQL injection
export const getUserById = (id: string): User | null => {
  // VULNERABLE: Direct string concatenation without sanitization
  const query = `SELECT * FROM users WHERE id=${id}`;
  
  console.log('Executing query:', query);
  
  // Check for blind SQL injection attempts
  // In a real scenario, the attacker wouldn't see this output directly
  if (query.includes("AND SUBSTRING") || query.includes("AND ASCII")) {
    console.log('Blind SQL injection attempt detected!');
    
    // Simulate boolean-based blind injection
    if (query.includes("admin") && query.includes("password")) {
      // This simulates leaking information through boolean responses
      return users[0];
    }
    return null;
  }
  
  // Normal user lookup
  const numId = parseInt(id, 10);
  if (isNaN(numId)) return null;
  return users.find(user => user.id === numId) || null;
};

export default {
  login,
  searchProducts,
  getUserById
};
