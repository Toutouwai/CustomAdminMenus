# Custom Admin Menus

Adds up to three custom menu items with optional dropdowns to the main admin menu.

The menu items can link to admin pages, front-end pages, or pages on external websites.

The links can be set to open in a new browser tab, and child links in the dropdown can be given an icon.

Requires ProcessWire v3.0.178 or newer.

## Screenshots

#### Example of menu items

![cam-1](https://user-images.githubusercontent.com/1538852/132316015-e8d46355-c67c-4c88-912b-6284e7e7b1dd.png)

#### Module config for the menus

![cam-2](https://user-images.githubusercontent.com/1538852/132316006-5e9c7704-ae3b-42c0-b745-fa25e0f54f2d.png)

#### Link list shown when parent menu item is not given a URL

![cam-3](https://user-images.githubusercontent.com/1538852/132315999-f1ed6afb-863c-43f5-83f6-77b9a80223ab.png)

## Advanced

If needed you can set the child menu items dynamically using a hook.

Example:
```php
$wire->addHookAfter('CustomAdminMenus::getMenuChildren', function(HookEvent $event) {
    // The menu number is the first argument
    $menu_number = $event->arguments(0);
    if($menu_number === 1) {
        $colours = $event->wire()->pages->findRaw('template=colour', ['title', 'url', 'page_icon']);
        $children = [];
        foreach($colours as $colour) {
            // Each child item should be an array with the following keys
            $children[] = [
                'icon' => $colour['page_icon'],
                'label' => $colour['title'],
                'url' => $colour['url'],
                'newtab' => false,
            ];
        }
        $event->return = $children;
    }
});
```
