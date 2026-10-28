import type { Stat } from "./types";

// TODO(content): confirm "11" vs "11+" platforms and 3 vs 4 countries with the JadeQuest team.
export const stats: Stat[] = [
  { value: 11, suffix: "+", label: "Proprietary platforms" },
  { value: 70, suffix: "+", label: "Engineers, remote-first" },
  { value: 4, pad: 2, label: "Countries" },
  { value: 83, suffix: "%", label: "Engineering graduates" },
  { value: 69, suffix: "%", label: "Team speaks three languages" },
  { value: 2, prefix: "<", suffix: "s", label: "Cryptographic proof time" },
];
