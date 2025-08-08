/**
 * @typedef {Object} IAccesoryMetadata
 * @property {string} name
 * @property {string} description
 * @property {[number, number]} sizes - Width and height
 */

/**
 * @typedef {Object} IToast
 * @property {number} id
 * @property {"error" | "success" | "info" | "warning"} status
 * @property {string} content
 */

/**
 * @typedef {Object} IToaster
 * @property {(t: IToast) => void} addToast
 *
 */

/**
 * @typedef {Object} IBudgetTotal
 * @property {number} subtotal
 * @property {number} total
 * @property {number} discount
 * @property {number} tax
 */
