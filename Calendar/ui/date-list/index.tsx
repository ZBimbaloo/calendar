import classnames from 'classnames'
import React from 'react'
import { Text, View } from '@tarojs/components'
import { Calendar } from '../../calendar'
import * as constant from '../../common/constant'
import "./index.scss";

const MAP: { [key: number]: string } = {
  [constant.TYPE_PRE_MONTH]: 'pre',
  [constant.TYPE_NOW_MONTH]: 'now',
  [constant.TYPE_NEXT_MONTH]: 'next'
}

export interface Props {
  list: Calendar.List<Calendar.Item>

  onClick?: (item: Calendar.Item) => void

  onLongClick?: (item: Calendar.Item) => void
}

export default class AtCalendarList extends React.Component<Props> {
  private handleClick = (item: Calendar.Item): void => {
    if (typeof this.props.onClick === 'function') {
      this.props.onClick(item)
    }
  }

  private handleLongClick = (item: Calendar.Item): void => {
    if (typeof this.props.onLongClick === 'function') {
      this.props.onLongClick(item)
    }
  }

  public render(): JSX.Element | null {
    const { list } = this.props
    if (!list || list.length === 0) return null

    return (
      <View className='at-calendar__list flex'>
        {list.map((item: Calendar.Item) => (
          <View
            key={`list-item-${item.value}`}
            onClick={this.handleClick.bind(this, item)}
            onLongPress={this.handleLongClick.bind(this, item)}
            className={classnames(
              'flex__item',
              `flex__item--${MAP[item.type]}`,
              {
                'flex__item--today': item.isToday,
                'flex__item--active': item.isActive,
                'flex__item--selected': item.isSelected,
                'flex__item--selected-head': item.isSelectedHead,
                'flex__item--selected-tail': item.isSelectedTail,
                'flex__item--blur':
                  item.isDisabled ||
                  item.type === constant.TYPE_PRE_MONTH ||
                  item.type === constant.TYPE_NEXT_MONTH
              }
            )}
          >
            <View className='flex__item-container'>
              <View className={(item.extra?.week==0||item.extra?.week==6)?'container-text week':'container-text'}>
                {item.text}
                {
                  item.extra?.holidays&&(item.extra?.holidays._p.work==true?<View className='work'>班</View>:<View className='rest'>休</View>)
                }
                
              </View>
              <View className={(item.extra?.week==0||item.extra?.week==6)?'container-lunarText week':'container-lunarText'}>
                {item.extra?.lunarHoliday && item.extra?.lunarHoliday.length < 4 ? (
                  <View className="red">{item.extra?.lunarHoliday}</View>
                ) : item.extra?.solarHoliday && item.extra?.solarHoliday.length < 4 ? (
                  <View className="red">{item.extra?.solarHoliday}</View>
                ) : item.extra?.lunarTerms ? (
                  <View className="green">{item.extra?.lunarTerms}</View>
                ) : (
                  <View>{item.extra?.lunar}</View>
                )}
              </View>
            </View>
            <View className='flex__item-extra extra'>
              {item.marks && item.marks.length > 0 ? (
                <View className='extra-marks'>
                  {item.marks.map((mark, key) => (
                    <Text key={key} className='mark'>
                      {mark}
                    </Text>
                  ))}
                </View>
              ) : null}
            </View>
          </View>
        ))}
      </View>
    )
  }
}
