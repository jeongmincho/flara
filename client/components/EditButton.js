import React from 'react'
import PropTypes from 'prop-types'
import {Button} from '@material-ui/core'

export default class EditBtn extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {productId, orderId, quantity} = this.props
    return (
      <div>
        <label>
          Quantity:
          <select
            onChange={e =>
              this.props.handleEdit(productId, orderId, Number(e.target.value))
            }
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
          {/* <Button
            type="button"
            onClick={() =>
              this.props.handleEdit(productId, orderId, this.state.quantity)
            }
            variant="contained"
            color="secondary"
            className="edit-button"
          >
            Edit
          </Button> */}
          Meal Price: $ {this.props.price}
        </label>
      </div>
    )
  }
}

// expect quantity prop pass down
// expect handleEdit function prop pass down
// expect productId and orderId props pass down
EditBtn.propTypes = {
  quantity: PropTypes.number,
  handleEdit: PropTypes.func,
  productId: PropTypes.number,
  orderId: PropTypes.number
}
