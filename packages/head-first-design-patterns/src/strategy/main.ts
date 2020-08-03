import { MiniDuckSimulator as initial } from './sim-u-duck/initial/MiniDuckSimulator'
import { MiniDuckSimulator as intermediate } from './sim-u-duck/intermediate/MiniDuckSimulator'
import { MiniDuckSimulator as final } from './sim-u-duck/final/MiniDuckSimulator'

export const enum Version {
  initial,
  intermediate,
  final
}

// run the code!!
export default function (
  version: Version = Version.initial
): void {
  switch (version) {
    case Version.initial:
      initial.main()
      break
    case Version.intermediate:
      intermediate.main()
      break

    case Version.final:
      final.main()
      break
  }
}
