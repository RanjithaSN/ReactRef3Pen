/* eslint-disable @typescript-eslint/no-empty-function */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';
import { withI18n } from 'react-i18next';
import { withRouter } from 'react-router';
import { AppContext } from 'selfcare-ui/src/components/appContext/app.context';
import Button from 'selfcare-ui/src/components/button/button';
import FilledButton from 'selfcare-ui/src/components/button/filled.button';
import LinkButton from 'selfcare-ui/src/components/button/link.button';
import { MEDIA_CONTEXT_SIZES } from 'selfcare-ui/src/components/mediaContext/media.context.constants';
import Modal from 'selfcare-ui/src/components/modal/modal';
import Popper from 'selfcare-ui/src/components/popper/popper';
import LocaleKeys from '../../../locales/keys';
import CartIconWithBadge from '../cart/cart.icon.with.badge.contextual';
import CartSummary from '../cartSummary/cart.summary.contextual';
import './cart.preview.scss';

const CartPreviewControl = ({ innerRef, toggleMenu, togglePopper }) => (
  <Button
    onClick={() => {
      toggleMenu();
      togglePopper();
    }}
  >
    <div ref={innerRef}>
      <CartIconWithBadge />
    </div>
  </Button>
);
CartPreviewControl.propTypes = {
  /** A forwarded ref emitted by the Popper */
  innerRef: PropTypes.node.isRequired,
  /** Control for opening and closing the Popper */
  togglePopper: PropTypes.func.isRequired,
  /** Control for opening and closing the Popper */
  toggleMenu: PropTypes.func.isRequired
};

const CartPreviewContent = ({ className,
  innerRef,
  viewDetailsText,
  onClickFunc }) => (
  <div
    ref={innerRef}
    className={classNames('c-cart-preview', className)}
  >
    <CartSummary
      disableClearCart
      showConditions={false}
      onClearCart={() => {}}
      className="c-cart-preview__summary"
    />
    <div className="c-cart-preview__actions">
      <LinkButton onMouseDown={() => onClickFunc()} className="c-cart-preview__actions-view-cart popper-override">{viewDetailsText}</LinkButton>
    </div>
  </div>
);
CartPreviewContent.propTypes = {
  /** Use to pass a custom class name to the component. */
  className: PropTypes.string,
  /** A forwarded ref emitted by the Popper */
  innerRef: PropTypes.node.isRequired,
  /** A callback function that should be called when the rendered button is clicked */
  onClickFunc: PropTypes.func.isRequired,
  /** The localized text to populate the link to  */
  viewDetailsText: PropTypes.string.isRequired
};

class CartPreview extends React.Component {
    state = {
      isOpen: false
    };

    toggleMenu = () => {
      this.setState((prevState) => ({
        isOpen: !prevState.isOpen
      }));
    };

    closeMenu = () => {
      this.setState({
        isOpen: false
      });
    };

    closeMenuAndNavigate = () => {
      this.setState({
        isOpen: false
      });
      this.props.history.push('/shop/cart');
    };

    render() {
      const { media } = this.context;
      const isSmallScreen = media.includes(MEDIA_CONTEXT_SIZES.SMALL);
      const { t } = this.props;
      const { isOpen } = this.state;
      return (
        <React.Fragment>
          <Popper
            isOpen={isOpen}
            options={{
              placement: 'bottom'
            }}
            emitControlRef
            emitContentRef
            control={CartPreviewControl}
            controlProps={{
              toggleMenu: this.toggleMenu,
              togglePopper: this.togglePopper
            }}
            content={CartPreviewContent}
            contentProps={{
              onClickFunc: this.closeMenuAndNavigate,
              viewDetailsText: t(LocaleKeys.CART_SUMMARY.VIEW_DETAILS),
              ...this.props
            }}
          />
          {(isOpen && isSmallScreen) && (
            <Modal
              className="c-cart-preview-modal"
              size="small"
              heading={isSmallScreen ? '' : t(LocaleKeys.CART_SUMMARY.CART_SUMMARY)}
              onClose={this.closeMenu}
              content={(
                <div className="c-cart-preview-modal__content">
                  {isSmallScreen && [
                    <CartSummary
                      key="cartPreviewModalSummary"
                      disableClearCart
                      showConditions={false}
                      onClearCart={() => {}}
                    />,
                    <div
                      key="cartPreviewModalActions"
                      className="c-cart-preview-modal__actions"
                    >
                      <FilledButton onClick={this.closeMenuAndNavigate} className="c-cart-preview__actions-view-cart">
                        {t(LocaleKeys.CART_SUMMARY.VIEW_DETAILS)}
                      </FilledButton>
                    </div>
                  ]}
                </div>
              )}
            />
          )}
        </React.Fragment>
      );
    }
}

CartPreview.displayName = 'CartPreview';
CartPreview.contextType = AppContext;
CartPreview.propTypes = {
  /** [[IgnoreDoc]] History instance provided by react-router */
  history: PropTypes.object.isRequired,
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func.isRequired
};

export default compose(
  withI18n(),
  withRouter
)(CartPreview);
