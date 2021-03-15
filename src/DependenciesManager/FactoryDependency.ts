import DependenciesManager from './DependenciesManager';
import PrevDepends from './PrevDepends';
import NextDepends from './NextDepends';
import BothDependencies from './BothDependencies';

type TypesFactoryDeps = 'both' | 'prev' | 'next';

export default function factoryDependency(
  operatorName: string,
  type: 'both',
): DependenciesManager<BothDependencies>;
export default function factoryDependency(
  operatorName: string,
  type: 'prev',
): DependenciesManager<PrevDepends>;
export default function factoryDependency(
  operatorName: string,
  type: 'next',
): DependenciesManager<NextDepends>;

export default function factoryDependency(
  operatorName: string,
  type: TypesFactoryDeps,
):
  | DependenciesManager<BothDependencies>
  | DependenciesManager<PrevDepends>
  | DependenciesManager<NextDepends>
  | null {
  switch (type) {
    case 'both':
      return new DependenciesManager<BothDependencies>(
        operatorName,
        true,
        true,
      );
    case 'prev':
      return new DependenciesManager<PrevDepends>(operatorName, true, false);
    case 'next':
      return new DependenciesManager<NextDepends>(operatorName, false, true);
    default:
      return null;
  }
}
