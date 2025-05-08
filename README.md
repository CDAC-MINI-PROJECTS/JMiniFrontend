# SplitExpense-Frontend

Here’s a breakdown of **Functional Requirements** and the corresponding **Data Model** for a **Split Expense / Settlement System** (like Splitwise):

---

## ✅ Functional Requirements (FRs)

### 📌 User Management

* FR1: Users should be able to sign up, log in, and manage their profile.
* FR2: Each user must have a unique email or username.
* FR3: Users can be part of one or more groups.

### 📌 Group & Expense Management

* FR4: Users can create groups (e.g., "Trip to Goa").
* FR5: Users can add members to groups.
* FR6: Any member can add an expense to a group.
* FR7: Expenses can be split equally or unequally among group members.
* FR8: Users can view their total balance, amount owed, and amount they owe to others.

### 📌 Settlement & History

* FR9: Users can mark expenses as settled (full or partial).
* FR10: Users can view the history of expenses and settlements.
* FR11: Automatic calculation of how much each user owes to others.

---

## ✅ Data Model (ER Diagram Components)

Here is a **relational model** representation (table-based):

### 🔸 `users`

| Column      | Type     | Description      |
| ----------- | -------- | ---------------- |
| user\_id    | INT (PK) | Unique user ID   |
| name        | VARCHAR  | User’s full name |
| email       | VARCHAR  | Unique email     |
| password    | VARCHAR  | Hashed password  |
| created\_at | DATETIME | Timestamp        |

---

### 🔸 `groups`

| Column      | Type     | Description        |
| ----------- | -------- | ------------------ |
| group\_id   | INT (PK) | Unique group ID    |
| name        | VARCHAR  | Group name         |
| created\_by | INT (FK) | Creator (user\_id) |
| created\_at | DATETIME | Timestamp          |

---

### 🔸 `group_members`

| Column     | Type     | Description           |
| ---------- | -------- | --------------------- |
| member\_id | INT (PK) | Unique ID             |
| group\_id  | INT (FK) | Belongs to this group |
| user\_id   | INT (FK) | User who is a member  |
| joined\_at | DATETIME | Timestamp             |

---

### 🔸 `expenses`

| Column      | Type     | Description                  |
| ----------- | -------- | ---------------------------- |
| expense\_id | INT (PK) | Unique expense ID            |
| group\_id   | INT (FK) | Belongs to which group       |
| paid\_by    | INT (FK) | Who paid (user\_id)          |
| description | VARCHAR  | e.g., "Dinner at restaurant" |
| amount      | DECIMAL  | Total amount spent           |
| created\_at | DATETIME | Timestamp                    |

---

### 🔸 `expense_splits`

| Column      | Type     | Description                        |
| ----------- | -------- | ---------------------------------- |
| split\_id   | INT (PK) | Unique split ID                    |
| expense\_id | INT (FK) | Related to which expense           |
| user\_id    | INT (FK) | User who owes money                |
| amount      | DECIMAL  | Amount owed by the user            |
| is\_settled | BOOLEAN  | Flag whether the amount is settled |

---

### 🔸 `settlements`

| Column         | Type     | Description             |
| -------------- | -------- | ----------------------- |
| settlement\_id | INT (PK) | Unique settlement ID    |
| payer\_id      | INT (FK) | User who paid           |
| payee\_id      | INT (FK) | User who received money |
| amount         | DECIMAL  | Amount paid             |
| created\_at    | DATETIME | Timestamp               |

---

## 🔁 Relationships

* A `user` can belong to many `groups` (via `group_members`).
* A `group` has many `expenses`.
* An `expense` has many `expense_splits` (each split tells how much a user owes).
* A `settlement` records repayments between users.

---

Would you like an ER diagram image based on this schema?
