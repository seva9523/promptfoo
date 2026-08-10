import { Command } from 'commander';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { viewCommand } from '../../src/commands/view';
import { startServer } from '../../src/server/server';

vi.mock('../../src/util/config/manage', () => ({
  setConfigDirectoryPath: vi.fn(),
}));
vi.mock('../../src/server/server');
vi.mock('../../src/util');

describe('viewCommand dot-segment eval IDs', () => {
  let program: Command;

  beforeEach(() => {
    program = new Command();
    vi.clearAllMocks();
  });

  it.each(['.', '..'])('rejects the dot-segment eval ID %s', async (evalId) => {
    viewCommand(program);
    const viewCmd = program.commands[0];

    await expect(viewCmd.parseAsync(['node', 'test', '--id', evalId])).rejects.toThrow(
      'Eval IDs "." and ".." cannot be opened with --id because browsers normalize dot-segment URL paths.',
    );
    expect(startServer).not.toHaveBeenCalled();
  });
});
