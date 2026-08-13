# Covid19Data SDK utility: make_context

from projectname_sdk.core.context import Covid19DataContext


def make_context_util(ctxmap, basectx):
    return Covid19DataContext(ctxmap, basectx)
