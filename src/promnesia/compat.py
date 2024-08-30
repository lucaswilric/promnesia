from typing import TYPE_CHECKING


if not TYPE_CHECKING:
    ## we used to have compat fixes here for these for python3.7
    ## keeping in case any sources depended on compat functions
    from subprocess import PIPE, run, check_call, check_output, Popen  # noqa: F401
    from typing import Protocol, Literal  # noqa: F401
    ##


# can deprecate after python3.9
def removeprefix(text: str, prefix: str) -> str:
    if text.startswith(prefix):
        return text[len(prefix):]
    return text
