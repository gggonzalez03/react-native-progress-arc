import React, { Component } from 'react'
import { View } from 'react-native'
import Svg, { Path } from 'react-native-svg'

class ProgressCircle extends Component {
  generateArcWithPadding = (radius, angle, padding, arcWidth) => {

    // Set large arc flag
    let overHalf = 0

    // Set large arc flat to 1 so that the arc covers over 180 degrees when needed
    if (angle > 180)
      overHalf = 1
    
    // 359 is the highest value that the arc can get
    // exceeding this will prevent the svg from showing the arc
    if (angle >= 360)
      angle = 359
    
    // padding is divided so that the image will be at
    // the perfect center of the view
    padding = padding / 2
    let angleRadians = angle * Math.PI / 180

    //Outer coords
    let coordXOuter = radius * Math.cos(angleRadians)
    let coordYOuter = radius * Math.sin(angleRadians)

    // Inner coords
    let coordXInner = (radius - arcWidth) * Math.cos(angleRadians)
    let coordYInner = (radius - arcWidth) * Math.sin(angleRadians)

    const startPoints = {
      outer: `${radius * 2 + padding},${radius + padding}`,
      inner: `${radius * 2 + padding - arcWidth},${radius + padding}`
    }
    const endPoints = {
      outer: `${(radius + padding) + coordXOuter},${(radius + padding) - coordYOuter}`,
      inner: `${(radius + padding) + coordXInner},${(radius + padding) - coordYInner}`
    }

    if (arcWidth) {
      return `M${startPoints.outer},
              A${radius},${radius}
                0 ${overHalf} 0 
              ${endPoints.outer}

              A${arcWidth / 2},${arcWidth / 2}
                0 ${overHalf} 0
              ${endPoints.inner}

              A${radius - arcWidth},${radius - arcWidth}
                0 ${overHalf} 1 
              ${startPoints.inner}
              
              A${arcWidth / 2},${arcWidth / 2}
                0 ${overHalf} 0
              ${startPoints.outer}`
    }

    return `M${startPoints.outer},
            A${radius},${radius}
              0 ${overHalf} 0 
            ${endPoints.outer}`

  }
  render() {
    const { radius, arcWidth, angle, rotate, padding, progressColor, progressBackgroundColor, percent } = this.props

    let progressAngle = angle * (percent/100)
    
    let progressBackground = this.generateArcWithPadding(radius, angle, padding, arcWidth)
    let progress = this.generateArcWithPadding(radius, progressAngle, padding, arcWidth)

    return (
        <Svg
          height={radius * 2 + padding}
          width={radius * 2 + padding}
        >
          <Path
            d={progressBackground}
            fill={progressBackgroundColor}
            rotate={rotate}
            origin={`${radius + padding / 2}, ${radius + padding / 2}`}
          />
          <Path
            d={progress}
            fill={progressColor}
            rotate={rotate}
            origin={`${radius + padding / 2}, ${radius + padding / 2}`}
          />
        </Svg>
    )
  }
}

export default ProgressCircle