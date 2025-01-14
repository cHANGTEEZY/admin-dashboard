import { pool } from "../db.js";

export const Properties = async (req, res) => {
  try {
    const Properties = await pool.query(`
      SELECT p.title, p.property_type, p.price, u.user_name AS hosted_by
      FROM property_listing_details p
      INNER JOIN user_details u ON p.user_id = u.user_id
    `);

    if (Properties.rows.length === 0) {
      console.log("No properties found.");
      return res.status(404).json({ message: "No properties available." });
    }

    res.json(Properties.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

export const pendingProperties = async (req, res) => {
  try {
  } catch (error) {}
};

export const allProperties = async (req, res) => {
  try {
    const allProperties = await pool.query(
      "SELECT * FROM property_listing_details"
    );
    res.json(allProperties.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

export const updateProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, property_type, price } = req.body;

    const updateQuery = `
      UPDATE property_listing_details 
      SET title = $1, property_type = $2, price = $3 
      WHERE property_id = $4 
      RETURNING *
    `;

    const updatedProperty = await pool.query(updateQuery, [
      title,
      property_type,
      price,
      id,
    ]);

    if (updatedProperty.rows.length === 0) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.json(updatedProperty.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

export const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteQuery = `
      DELETE FROM property_listing_details 
      WHERE property_id = $1 
      RETURNING *
    `;

    const deletedProperty = await pool.query(deleteQuery, [id]);

    if (deletedProperty.rows.length === 0) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.json({ message: "Property deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};
