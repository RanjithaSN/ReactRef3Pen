import classNames from 'classnames';
import PropTypes from 'prop-types';
import pathOr from 'ramda/src/pathOr';
import React from 'react';
import IconAngleLeft from '../../icons/react-icons/angle-left';
import IconAngleRight from '../../icons/react-icons/angle-right';
import MicroButton from '../button/micro.button';
import IconButton from '../iconButton/icon.button';
import './carousel.scss';


const ANIMATION_TIME = 700;

class Carousel extends React.Component {
  constructor(props) {
    super(props);

    this.nativeScrollSnapSupported = ('scrollSnapType' in document.documentElement.style ||
            'webkitScrollSnapType' in document.documentElement.style ||
            'msScrollSnapType' in document.documentElement.style);

    this.state = {
      current: 0,
      max: 0
    };
    this.carouselContent = React.createRef();
  }

  componentDidMount() {
    if (!this.carouselContent.current) {
      return;
    }

    this.getLayoutState();
  }

  componentDidUpdate() {
    if (this.carouselContent.current) {
      this.getLayoutState();
      this.carouselContent.current.addEventListener('scroll', this.handleScroll);

      if (!this.nativeScrollSnapSupported) {
        this.carouselContent.current.addEventListener('touchstart', this.handleTouchStart);
        this.carouselContent.current.addEventListener('touchend', this.handleTouchEnd);
      }
      window.addEventListener('resize', this.handleResize);
    }
  }

  componentWillUnmount() {
    this.carouselContent.current.removeEventListener('scroll', this.handleScroll);
    if (!this.nativeScrollSnapSupported) {
      this.carouselContent.current.removeEventListener('touchstart', this.handleTouchStart);
      this.carouselContent.current.removeEventListener('touchend', this.handleTouchEnd);
    }
    window.removeEventListener('resize', this.handleResize);

    // Clear any timeouts / animations
    if (this.animationRequest) {
      cancelAnimationFrame(this.animationRequest);
    }
    if (this.queueTimeout) {
      clearTimeout(this.queueTimeout);
    }
  }

  getPositioning() {
    if (!this.props.children) {
      return;
    }

    // There may be more scroll than we should scroll, based on the addition of a spacer
    const lastChild = this.carouselContent.current.children[(this.carouselContent.current.children.length || 1) - 1];

    return {
      width: this.carouselContent.current.offsetWidth,
      scrollWidth: Math.max(lastChild ? lastChild.offsetLeft + lastChild.offsetWidth : 0, this.carouselContent.current.offsetWidth),
      scroll: this.carouselContent.current.scrollLeft
    };
  }

  getLayoutState() {
    if (!this.props.children) {
      return;
    }

    const layoutState = {};
    const positioning = this.getPositioning();

    if (this.state.width !== positioning.width) {
      layoutState.width = positioning.width;
    }

    // Find the furthest item that needs a snap point for navigation and the spacer
    const carouselChildren = Array.from(this.carouselContent.current.children);
    let max = carouselChildren.length - 1;
    carouselChildren.some((child, index) => {
      if (this.calculateSnapOffset(index) + positioning.width >= positioning.scrollWidth) {
        max = index;
        return true;
      }
      return false;
    });

    if (this.state.max !== max) {
      layoutState.max = max;
    }

    if (max < 0) {
      return;
    }

    // A spacer is added to the end of the carousel if the width of the existing children
    // doesn't subdivide 100% of the container width evenly
    const spacerWidth = this.carouselContent.current.offsetWidth - this.carouselContent.current.clientWidth;
    if (this.state.spacerWidth !== spacerWidth) {
      layoutState.spacerWidth = spacerWidth;
    }

    // These styles are being deprecated, but are required for current MS/Firefox support
    const scrollSnapPointsX = `repeat(${
      Math.round(carouselChildren[0].offsetWidth / positioning.width * 100)
    }%)`;

    if (
      !('scrollSnapType' in document.documentElement.style) &&
            (!this.state.snapStyles || this.state.snapStyles.scrollSnapPointsX !== scrollSnapPointsX)
    ) {
      layoutState.snapStyles = {
        scrollSnapPointsX,
        msScrollSnapPointsX: scrollSnapPointsX,
        WebkitScrollSnapPointsX: scrollSnapPointsX
      };
    }

    if (!this.state.scrollbarOffsetStyles) {
      const verticalOffset = this.carouselContent.current.offsetHeight - this.carouselContent.current.clientHeight;
      layoutState.scrollbarOffsetStyles = {
        marginBottom: verticalOffset ? `-${verticalOffset}px` : undefined,
        marginRight: spacerWidth ? `-${spacerWidth}px` : undefined
      };
    }

    if (Object.keys(layoutState).length) {
      this.setState(layoutState);
    }
  }

    handleScroll = () => {
      // check if still animating
      if (!this.animation) {
        this.setState({
          current: this.findCurrent()
        });
        this.queueSnapAnimation();
        // User has scrolled, cancel any current animation
        if (this.animationRequest) {
          cancelAnimationFrame(this.animationRequest);
        }
      }
    };

    handleResize = () => {
      this.getLayoutState();
      this.scrollSnap(false);
    };

    handleTouchStart = () => {
      this.touched = true;
    };

    handleTouchEnd = () => {
      this.touched = false;
      this.queueSnapAnimation();
    };

    handleKeyDown = (event) => {
      switch (event.key) {
      case 'ArrowRight':
        this.gotoNext();
        break;
      case 'ArrowLeft':
        this.gotoPrev();
        break;
      default:
        return;
      }
      event.preventDefault();
    };

    gotoPrev = () => {
      if (this.state.current === 0) {
        this.goto(this.state.max);
      } else {
        this.goto(this.state.current - 1);
      }
    };

    gotoNext = () => {
      if (this.state.current === this.state.max) {
        this.goto(0);
      } else {
        this.goto(this.state.current + 1);
      }
    };

    goto = (index) => {
      if (this.state.current === index || index < 0 || index > this.state.max) {
        return;
      }

      const offset = this.calculateSnapOffset(index);
      this.animateScroll(offset);
      if (this.props.itemChanged) {
        this.props.itemChanged(index);
      }
    };

    calculateSnapOffset = (index) => {
      const positioning = this.getPositioning();
      const maxScroll = positioning.scrollWidth - positioning.width;
      const scroll = this.carouselContent.current.children[index].offsetLeft;
      if (index === 0) {
        return 0;
      }
      return Math.min(scroll, maxScroll);
    };

    animationStep = (timestamp) => {
      const delta = (timestamp - this.animation.timestamp) / this.animation.duration;

      // The non rounded current scroll is stored in the animation object to provide smoother animations
      this.animation.scroll = (this.animation.target - this.animation.scroll) * delta + this.animation.scroll;
      // But the actual scroll is rounded for display and comparison
      const animationScroll = Math.round(this.animation.scroll);
      this.carouselContent.current.scrollLeft = animationScroll;

      if (animationScroll !== this.animation.target) {
        this.animationRequest = window.requestAnimationFrame(this.animationStep);
      } else {
        delete this.animation;
      }
    };

    modifyChildren = (child) => {
      if (!this.props.scrollEach) {
        return child;
      }

      return React.cloneElement(child, {
        style: {
          minWidth: `${this.state.width}px`
        }
      });
    };

    animateScroll(offset) {
      this.animation = {
        duration: ANIMATION_TIME,
        scroll: this.carouselContent.current.scrollLeft,
        timestamp: performance.now ?
          performance.now() :
          Date.now(),
        target: offset
      };

      if (this.animationRequest) {
        cancelAnimationFrame(this.animationRequest);
      }
      this.animationRequest = window.requestAnimationFrame(this.animationStep);
    }

    scrollSnap(animate = true) {
      // Don't animate if snap is natively supported
      if (this.nativeScrollSnapSupported && animate) {
        return;
      }

      const offset = this.calculateSnapOffset(this.state.current);

      if (animate) {
        this.animateScroll(offset);
      } else {
        this.carouselContent.current.scrollLeft = offset;
      }
    }

    findCurrent() {
      let min = 0;
      const carouselChildren = Array.from(this.carouselContent.current.children);

      if (!carouselChildren.length) {
        return 0;
      }
      const positioning = this.getPositioning();


      min = carouselChildren.reduce((acc, child, childIndex) => {
        return Math.abs(positioning.scroll - this.calculateSnapOffset(childIndex)) < Math.abs(this.calculateSnapOffset(acc) - positioning.scroll) ?
          childIndex :
          acc;
      }, min);

      return min;
    }

    queueSnapAnimation() {
      if (this.touched) {
        return;
      }
      if (this.queueTimeout) {
        clearTimeout(this.queueTimeout);
      }
      this.queueTimeout = setTimeout(() => {
        this.scrollSnap();
      }, 100);
    }

    navArrows() {
      const enableScrollThrough = this.props.scrollThrough && this.numberOfChildren() > 1;
      return (
        <nav
          className={classNames('c-carousel__nav-arrows', {
            'is-inverted': this.props.invertNavColors
          })}
        >

          <IconButton
            icon={<IconAngleLeft />}
            className="c-carousel__nav-arrow c-carousel__nav-arrow--left"
            disabled={this.state.current === 0 && !enableScrollThrough}
            onClick={this.gotoPrev}
          />
          <IconButton
            icon={<IconAngleRight />}
            className="c-carousel__nav-arrow c-carousel__nav-arrow--right"
            disabled={this.state.current === this.state.max && !enableScrollThrough}
            onClick={this.gotoNext}
          />
        </nav>
      );
    }

    navDots() {
      const numberOfChildren = this.numberOfChildren();
      let max = this.state.max;
      if (this.props.scrollEach) {
        max = numberOfChildren;
      } else {
        max += 1;
      }

      const displayDots = (this.props.scrollEach && numberOfChildren > 0) || Boolean(this.state.max);
      return (
        <nav className="c-carousel__nav-dots">
          <span className="c-carousel__counter">
            {(`0${this.state.current + 1}`).slice(-2)}
          </span>
          {displayDots && [...new Array(max).keys()].map((index) => (
            <MicroButton
              className={classNames('c-carousel__nav-dot', {
                'is-current': index === this.state.current,
                'is-inverted': this.props.invertNavColors
              })}
              style={{
                width: `calc(69% / ${max})`
              }}
              onClick={() => this.goto(index)}
              key={index}
            />
          ))}
          <span className="c-carousel__counter">
            {(`0${max}`).slice(-2)}
          </span>
        </nav>
      );
    }

    spacerElement() {
      if (this.state.spacerWidth > 0) {
        return (
          <div
            style={{
              width: this.state.spacerWidth,
              minWidth: this.state.spacerWidth,
              flex: `0 ${this.state.spacerWidth}px 0`
            }}
          />
        );
      }
    }

    numberOfChildren() {
      return pathOr(0, ['current', 'children', 'length'], this.carouselContent);
    }

    displayNavArrows() {
      const numberOfChildren = this.numberOfChildren();
      if (this.props.scrollEach) {
        return numberOfChildren >= 1;
      }

      return numberOfChildren > 1;
    }

    render() {
      const { children, className, contentClassName, contentWrapperClassName, simpleLayout } = this.props;
      return (
        <div
          className={classNames('c-carousel', {
            'c-carousel--simple': simpleLayout
          }, className)}
          onKeyDown={this.handleKeyDown}
          role="link"
          tabIndex="-1"
        >
          <div className={classNames('c-carousel__content-wrapper', contentWrapperClassName)}>
            <div
              className={classNames('c-carousel__content', contentClassName)}
              ref={this.carouselContent}
              style={{
                ...this.state.snapStyles,
                ...this.state.scrollbarOffsetStyles
              }}
            >
              {React.Children.map(children, (child) => this.modifyChildren(child))}
              {this.spacerElement()}
            </div>
          </div>
          {this.displayNavArrows() && (
            <React.Fragment>
              {this.navArrows()}
              {this.navDots()}
            </React.Fragment>
          )}
        </div>
      );
    }
}

Carousel.displayName = 'Carousel';
Carousel.propTypes = {
  /** Children will be rendered within the body of the card list. */
  children: PropTypes.node,
  /** Use to pass a custom class name to the component. */
  className: PropTypes.string,
  /** Used to pass a custom class name to content */
  contentClassName: PropTypes.string,
  /** Used to pass a custom class name to the content wrapper. */
  contentWrapperClassName: PropTypes.string,
  /** Flag to tell us if we render inverted nav dot and arrow colors */
  invertNavColors: PropTypes.bool,
  /** Function to fire off when we change the item */
  itemChanged: PropTypes.func,
  /** Variant to identify if it should allow prev/next on first/last card. */
  scrollThrough: PropTypes.bool,
  /** Variant to only display one item at a time */
  scrollEach: PropTypes.bool,
  /** Whether to use the simple layout of the carousel */
  simpleLayout: PropTypes.bool
};
Carousel.defaultProps = {
  scrollEach: false
};

export default Carousel;
