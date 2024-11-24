import os.path
import urllib.parse


def logseq_replacer(path: str, root: str) -> str:
    if not path.startswith("editor://") or not (path.endswith((".md", ".org"))):
        return path

    graph = os.path.basename(root)  # noqa: PTH119
    file_name = os.path.basename(path).rsplit('.', 1)[0]  # noqa: PTH119
    date_parts = file_name.split('_')
    year = date_parts[0]
    month = date_parts[1]
    day = date_parts[2]

    page_name = f"{day}-{month}-{year}"

    encoded_page_name = urllib.parse.quote(page_name)

    uri = f"logseq://graph/{graph}?page={encoded_page_name}"

    return uri
