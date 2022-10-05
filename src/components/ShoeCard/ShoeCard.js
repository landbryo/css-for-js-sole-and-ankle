import React from 'react';
import styled from 'styled-components/macro';

import {COLORS, WEIGHTS} from '../../constants';
import {formatPrice, isNewShoe, pluralize} from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
                      slug,
                      name,
                      imageSrc,
                      price,
                      salePrice,
                      releaseDate,
                      numOfColors,
                  }) => {
    // There are 3 variants possible, based on the props:
    //   - new-release
    //   - on-sale
    //   - default
    //
    // Any shoe released in the last month will be considered
    // `new-release`. Any shoe with a `salePrice` will be
    // on-sale. In theory, it is possible for a shoe to be
    // both on-sale and new-release, but in this case, `on-sale`
    // will triumph and be the variant used.
    // prettier-ignore
    const variant = typeof salePrice === 'number'
        ? 'on-sale'
        : isNewShoe(releaseDate)
            ? 'new-release'
            : 'default'

    return (
        <Link href={`/shoe/${slug}`}>
            <Wrapper>
                <ImageWrapper>
                    <Image alt="" src={imageSrc}/>
                    {variant === 'new-release' && <NewFlag>Just Released!</NewFlag>}
                    {variant === 'on-sale' && <SaleFlag>Sale</SaleFlag>}
                </ImageWrapper>
                <Spacer size={12}/>
                <Row>
                    <Name>{name}</Name>
                    <Price style={{
                        '--color': variant === 'on-sale' && COLORS.gray[700],
                        '--text-decoration': variant === 'on-sale' && 'line-through',
                    }}>{formatPrice(price)}</Price>
                </Row>
                <Row>
                    <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
                    {variant === 'on-sale' ?
                        <SalePrice>{formatPrice(salePrice)}</SalePrice> :
                        undefined
                    }
                </Row>
            </Wrapper>
        </Link>
    );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Wrapper = styled.article``;

const ImageWrapper = styled.div`
`;

const Image = styled.img`
  border-radius: 16px 16px 4px 4px;
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  font-size: 1rem;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  color: var(--color);
  text-decoration: var(--text-decoration);
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

const Flag = styled.div`
  background-color: var(--color);
  border-radius: 2px;
  color: ${COLORS.white};
  font-size: ${(14 / 16) + 'rem'};
  font-weight: ${WEIGHTS.bold};
  line-height: 1;
  padding: 8px;
  position: absolute;
  top: 12px;
  right: -4px;
`;

const NewFlag = styled(Flag)`
  background-color: ${COLORS.secondary}
`;

const SaleFlag = styled(Flag)`
  background-color: ${COLORS.primary}
`;

export default ShoeCard;
