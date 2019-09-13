import React, {
FC, ReactElement, ReactNode, SVGProps,
} from 'react';
import { styled, forTabletLandscapeUp } from 'theme';
import Img from 'react-image';

const Name = styled.h4`
  margin-bottom: 10px;
  font-size: 1.2em;
`;

const Property = styled.p`
  margin-right: 10px;
`;

const Value = styled.h4`
  line-height: 1.4em;
`;

const Pair = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 5px;
  ${forTabletLandscapeUp()} {
    margin-right: 40px;
  }
`;

const Image = styled(Img)`
  width: 60px;
  height: 60px;
  margin-right: 20px;
`;

export interface Info {
  name: string;
  value: string | ReactNode;
}

interface Props {
  data: Info[];
  title: string;
  image?: string;
  icon?: FC<SVGProps<SVGSVGElement>>;
  fallbackIcon?: FC<SVGProps<SVGSVGElement>>;
  className?: string;
  row?: boolean;
}

export const Tile: FC<Props> = ({
 data, title, image, icon, className, row, fallbackIcon,
}): ReactElement => {
  const Icon = icon && styled(icon)`
    width: 50px;
    height: 50px;
    margin-right: 20px;
    fill: ${({ theme }) => theme.colors.text};
  `;

  const FallbackIcon = fallbackIcon && styled(fallbackIcon)`
    width: 60px;
    height: 60px;
    margin-right: 20px;
    padding: 10px;
    fill: ${({ theme }) => theme.colors.text};
  `;

  const Container = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 40px;
    width: ${row ? '100%' : 'unset'};
  `;

  const Details = styled.div`
    display: flex;
    flex-direction: column;
    ${forTabletLandscapeUp()} {
      flex-direction: ${row ? 'row' : 'column'};
      flex-wrap: wrap;
    }
  `;

  return (
    <Container className={className}>
      {!image && Icon && <Icon />}
      <Image
        src={image}
        loader={FallbackIcon && <FallbackIcon />}
        unloader={FallbackIcon && <FallbackIcon />}
      />
      <div>
        <Name>{title}</Name>
        <Details>
          {data.map(({ name, value }, i) => (
            <Pair key={i}>
              <Property>{name}:</Property>
              <Value>{value}</Value>
            </Pair>
          ))}
        </Details>
      </div>
    </Container>
  );
};
