import React from 'react'
import PropTypes from 'prop-types'

export default class EditButtonGuest extends React.Component {
  render() {
    const {productId, quantity} = this.props
    return (
      <div>
        <label>
          Quantity:
          <select
            onChange={e => this.props.handleEdit(productId, e.target.value)}
            value={quantity}
            className="edit-button"
          >
            {Array(5)
              .fill(1)
              .map((val, i) => {
                return (
                  <option value={val + i} key={val + i}>
                    {val + i}
                  </option>
                )
              })}
          </select>
        </label>
      </div>
    )
  }
}

// expect quantity prop pass down
// expect handleEdit function prop pass down
// expect productId and orderId props pass down
EditButtonGuest.propTypes = {
  quantity: PropTypes.string,
  handleEdit: PropTypes.func,
  productId: PropTypes.number
}
