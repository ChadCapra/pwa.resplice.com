import React, { Component, createRef } from 'react'

import ActionIcon from '../Util/ActionIcon'
import FlexBox from '../Layout/FlexBox'
import Dropdown from '../Form/Dropdown'

import styles from './Card.module.scss'

import { formatAttrValues } from '../../helpers'

const LeftChild = () => {}
const RightChild = () => {}

export default class Attribute extends Component {
  static LeftChild = LeftChild
  static RightChild = RightChild

  state = {
    showDropdown: false
  }

  attributeRef = createRef()

  render() {
    const { children, attribute, immutable } = this.props
    let childArr = []
    if (children && typeof children !== Array) {
      childArr.push(children)
    } else if (children) {
      childArr = children
    }
    const leftChild = childArr.find(child => child.type === LeftChild)
    const rightChild = childArr.find(child => child.type === RightChild)
    return (
      <div className={styles.Attribute}>
        {leftChild ? (
          <FlexBox
            direction="column"
            justify="start"
            align="start"
            className={styles.Left}
          >
            {leftChild.props.children}
          </FlexBox>
        ) : (
          <FlexBox justify="start" align="center" className={styles.Left}>
            <ActionIcon
              name={attribute.actions[0].icon}
              fill={immutable ? '#C4C4C4' : '#1bbc9b'}
              width="2.5em"
            />
          </FlexBox>
        )}
        <FlexBox
          direction="column"
          justify="center"
          align="start"
          className={styles.Middle}
          ref={this.attributeRef}
          onClick={() =>
            this.setState({ showDropdown: !this.state.showDropdown })
          }
        >
          <span className={styles.Name}>{attribute.name}</span>
          <span className={styles.Value}>
            {formatAttrValues(attribute.value)}
          </span>
        </FlexBox>
        {!immutable && this.state.showDropdown && (
          <Dropdown
            show={this.state.showDropdown}
            parent={this.attributeRef.current}
            items={['item 1', 'item 2', 'item 3', 'item 4']}
            close={() => this.setState({ showDropdown: false })}
            onSelect={idx => console.log(idx)}
          />
        )}
        {rightChild ? (
          <FlexBox justify="end" align="center" className={styles.Right}>
            {rightChild.props.children}
          </FlexBox>
        ) : (
          <FlexBox justify="end" align="center" className={styles.Right}>
            <ActionIcon
              name={attribute.actions[1].icon}
              fill={immutable ? '#C4C4C4' : '#1bbc9b'}
              width="2.5em"
            />
          </FlexBox>
        )}
      </div>
    )
  }
}
