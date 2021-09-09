# Custom Admin Menus

Adds up to three custom menu items with optional dropdowns to the main admin menu.

The menu items can link to admin pages, front-end pages, or pages on external websites.

The links can be set to open in a new browser tab, and child links in the dropdown can be given an icon.

Requires ProcessWire v3.0.178 or newer.

## Screenshots

#### Example of menu items

![cam-1](https://user-images.githubusercontent.com/1538852/132316015-e8d46355-c67c-4c88-912b-6284e7e7b1dd.png)

#### Module config for the menus

![cam-2](https://user-images.githubusercontent.com/1538852/132323138-29d675ef-9f1a-4f23-a482-25a075505a4a.png)

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

It's also possible to create multiple levels of flyout submenus using a hook. 

![cam-4](https://user-images.githubusercontent.com/1538852/132603335-c531d819-4f01-4e28-8900-45956a856dc1.png)

For each level a submenu can be defined in a "children" item. Example:
```php
$wire->addHookAfter('CustomAdminMenus::getMenuChildren', function(HookEvent $event) {
    // The menu number is the first argument
    $menu_number = $event->arguments(0);
    if($menu_number === 1) {
        $children = [
            [
                'icon' => 'adjust',
                'label' => 'One',
                'url' => '/one/',
                'newtab' => false,
            ],
            [
                'icon' => 'anchor',
                'label' => 'Two',
                'url' => '/two/',
                'newtab' => false,
                'children' => [
                    [
                        'icon' => 'child',
                        'label' => 'Red',
                        'url' => '/red/',
                        'newtab' => false,
                    ],
                    [
                        'icon' => 'bullhorn',
                        'label' => 'Green',
                        'url' => '/green/',
                        'newtab' => false,
                        'children' => [
                            [
                                'icon' => 'wifi',
                                'label' => 'Small',
                                'url' => '/small/',
                                'newtab' => true,
                            ],
                            [
                                'icon' => 'codepen',
                                'label' => 'Medium',
                                'url' => '/medium/',
                                'newtab' => false,
                            ],
                            [
                                'icon' => 'cogs',
                                'label' => 'Large',
                                'url' => '/large/',
                                'newtab' => false,
                            ],
                        ]
                    ],
                    [
                        'icon' => 'futbol-o',
                        'label' => 'Blue',
                        'url' => '/blue/',
                        'newtab' => true,
                    ],
                ]
            ],
            [
                'icon' => 'hand-o-left',
                'label' => 'Three',
                'url' => '/three/',
                'newtab' => false,
            ],
        ];
        $event->return = $children;
    }
});
```
